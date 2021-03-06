package ca.sharcnet.dh.nerve;
import ca.frar.jjjrmi.socket.JJJSocket;
import ca.frar.jjjrmi.socket.observer.JJJObserver;
import ca.frar.jjjrmi.socket.observer.events.JJJExceptionEvent;
import ca.frar.jjjrmi.socket.observer.events.JJJOpenEvent;
import ca.frar.utility.console.Console;
import ca.sharcnet.dh.sql.SQL;
import ca.sharcnet.dh.sql.SQLEntry;
import ca.sharcnet.dh.sql.SQLRecord;
import ca.sharcnet.dh.sql.SQLResult;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;

public class NerveSocket extends JJJSocket<NerveRoot> implements JJJObserver {
    private NerveRoot nerveRoot;

    public NerveSocket() throws IOException, ClassNotFoundException, IllegalAccessException, SQLException, InstantiationException {
        this.addObserver(this);
    }

    @Override
    public NerveRoot retrieveRoot() {
        return this.nerveRoot;
    }

    @Override
    public void socketOpen(JJJOpenEvent event) {
        try {
            ServletContext context = this.getContext();

            String path = "/WEB-INF/config.properties";
            InputStream configStream = context.getResourceAsStream(path);
            String realpath = context.getRealPath(path);
            Console.log("Config.properties real path = '" + realpath + "'");
            if (configStream == null) {
                throw new NullPointerException("config.properties not found");
            }
            Properties config = new Properties();
            config.load(configStream);
            this.nerveRoot = new NerveRoot(config);

            this.verifySQL(config);

        } catch (IOException | ClassNotFoundException | IllegalAccessException | SQLException | InstantiationException ex) {
            Logger.getLogger(NerveSocket.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void verifySQL(Properties config) throws ClassNotFoundException, IllegalAccessException, IllegalAccessException, IOException, InstantiationException {
        SQL sql;
        try {
            sql = new SQL(config);
            SQLResult result = sql.tables();

            Console.log(result.size() + " entries");
            for (SQLRecord r : result) {
                for (SQLEntry c : r) {
                    Console.log(c.getName() + ", " + c.getValue());
                }
            }

            if (result.size() == 0) {
                Console.log("creating tables");
                sql.update("create table dictionaries (name varchar(64))");
                sql.update("CREATE TABLE custom ("
                        + "entity varchar(255) NOT NULL,"
                        + "lemma varchar(128) NOT NULL,"
                        + "link varchar(255) NOT NULL,"
                        + "tag varchar(16) NOT NULL,"
                        + "source varchar(16) NOT NULL,"
                        + "constraint pk primary key(lemma, tag, source)"
                        + ");");
                sql.update("CREATE INDEX iEntity ON custom (entity)");
            }
        } catch (SQLException ex) {
            Logger.getLogger(NerveSocket.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void socketException(JJJExceptionEvent event) {
        Throwable exception = event.getException();
        Console.log("Socket Exception: " + exception.getClass().getSimpleName());
        Console.log(exception.getMessage());
        for (StackTraceElement trace : exception.getStackTrace()) {
            Console.log(trace);
        }
    }
}
