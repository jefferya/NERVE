/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ca.sharcnet.nerve.docnav.tests;

import ca.sharcnet.nerve.Console;
import ca.sharcnet.nerve.HasStreams;
import ca.sharcnet.nerve.docnav.DocumentLoader;
import ca.sharcnet.nerve.docnav.dom.Document;
import ca.sharcnet.nerve.docnav.dom.Node;
import ca.sharcnet.nerve.docnav.dom.NodeList;
import ca.sharcnet.nerve.docnav.dom.NodeType;
import ca.sharcnet.nerve.docnav.query.Query;
import ca.sharcnet.nerve.docnav.schema.relaxng.RelaxNGSchema;
import ca.sharcnet.nerve.docnav.schema.relaxng.RelaxNGSchemaLoader;
import java.io.IOException;
import java.io.InputStream;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author edward
 */
public class Isolated implements HasStreams{

    @Override
    public InputStream getResourceStream(String path) {
        return this.getClass().getResourceAsStream("/resources/" + path);
    }

    /* document.xml is vald to orlando_biography_v2 */
    @Test
    public void load_check_doc_0() throws IOException{
        RelaxNGSchema schema = RelaxNGSchemaLoader.schemaFromStream(getResourceStream("orlando_biography_v2.xml"));
        Document doc = DocumentLoader.documentFromStream(getResourceStream("document.xml"));

        doc.query("BIRTHNAME").forEach(node->{
            Console.log(node.toSelect());
            assertTrue(schema.isValid(node));
        });
    }

}
