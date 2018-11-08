package ca.sharcnet.dh.scriber;

public class Constants {
    private Constants(){}

    /**
    The name of the HTML dom element.
    */
    public final static String HTML_TAGNAME = "div";

    /**
    The HTML attribute that contains the XML tag name.
    */
    public final static String ORG_TAGNAME = "xmltagname";

    /**
    The HTML attribute whose value is the XML attributes as a JSON object.
    */
    public final static String XML_ATTR_LIST = "xmlattrs";

    /**
    The HTML class for non entity, non prolog elements.
    */
    public final static String HTML_NONENTITY = "xmltag";

    /**
    The HTML class for XML instruction elements.
    */
    public final static String HTML_PROLOG = "xmlprolog";

    /**
    The HTML class for XML doctype elements.
    */
    public final static String HTML_DOCTYPE = "xmldoctype";

    /**
    The HTML class for XML tagged entity elements.
    */
    public final static String HTML_ENTITY = "taggedentity";

    /**
    The innertext value of XML doctype elements.
    */
    public final static String DOCTYPE_INNERTEXT = "xmlinnertext";

    /*
    The name of the instruction node which will have the schema url.
    */
    public final static String SCHEMA_NODE_NAME = "xml-model";

    /*
    The name of the attribue in the schema instruction node which holds the chema url value.
    */
    public final static String SCHEMA_NODE_ATTR = "href";

    /*
    The name of the instruction node which will have the schema url.
    */
    public final static String CONTEXT_NODE_NAME = "context";

    /*
    The name of the attribue in the schema instruction node which holds the chema url value.
    */
    public final static String CONTEXT_NODE_ATTR = "name";
    
    /*
    The value to put into tag-source-attribute if the tag was generated by NER.
    */
    public final static String TAG_SRC_VAL_NER = "nerve-ner";    
    
    /*
    The value to put into tag-source-attribute if the tag was generated by dictionary lookup.
    */
    public final static String TAG_SRC_VAL_DICT = "nerve-dict";        
    
    /*
    This attribute will contain the name of the dictonary source for the lemma/tagname values.
    It will be ignored during decode.    
    */
    public final static String DICT_SRC_ATTR = "dict-src";
    
    /*
    The root path to the schema documents in the resource dirctory
    */
    public final static String SCHEMA_PATH = "schemas";
    
    /*
    The root path to the context documents in the resource dirctory
    */
    public final static String CONTEXT_PATH = "contexts";  
    
    /*
    Link data attribute for html.
    */
    public final static String DATA_LINK = "data-link";  
    
    /*
    Lemma data attribute for html.
    */
    public final static String DATA_LEMMA = "data-lemma";  
}
