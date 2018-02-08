/* global selected, model, search, TaggedEntity, this.factory, Utility, trace, cD, Range, DOMException, Function, HTMLDivElement, FileOperations, Storage, EntityValues */

/**
 * Events: userMessage
 * @type type
 */
class TaggedEntityController {
    constructor(controller, model, taggedEntityModel) {
        Utility.log(TaggedEntityController, "constructor");
        Utility.enforceTypes(arguments, Controller, Model, TaggedEntityModel);

        this.controller = controller;
        this.model = model;
        this.taggedEntityModel = taggedEntityModel;

        $(this.taggedEntityModel.getElement()).click((event) => this.click(event));
        $(this.taggedEntityModel.getContentElement()).click((event) => this.click(event));
        $(this.taggedEntityModel.getContentElement()).dblclick((event) => this.dblclick(event));
    }
    dblclick(event) {
        Utility.log(TaggedEntityController, "dblclick");
        window.getSelection().removeAllRanges();
        this.taggedEntityModel.selectLikeEntitiesByLemma();
        event.stopPropagation();
    }
    click(event) {
        Utility.log(TaggedEntityController, "click");
        event.stopPropagation();

        if (event.altKey) {
            console.log(this.taggedEntityModel);
            window.lastTarget = this.taggedEntityModel;
            return;
        }

        if (!event.ctrlKey) {
            this.model.getCollection().clear();
            event.stopPropagation();
        }

        if (!event.ctrlKey && !event.metaKey) {
            this.model.getCollection().set(this.taggedEntityModel);
        }
        else if (!this.model.getCollection().contains(this.taggedEntityModel)) {
            this.model.getCollection().add(this.taggedEntityModel);
        }
        else {
            this.model.getCollection().remove(this.taggedEntityModel);
        }
    }
}

class Controller {
    constructor(model, scriber) {
        Utility.log(Controller, "constructor");
        Utility.enforceTypes(arguments, Model, Scriber);

        this.model = model;
        this.scriber = scriber;
        this.storage = new Storage("NERVE_CONTROLLER");
        model.addListener(this);
    }
    /**
     * Model event listener.
     * @param {type} taggedEntityModel
     * @returns {undefined}
     */
    notifyNewTaggedEntity(taggedEntityModel) {
        Utility.log(Controller, "notifyNewTaggedEntity");
        Utility.enforceTypes(arguments, TaggedEntityModel);
        new TaggedEntityController(this, this.model, taggedEntityModel);
    }
    /**
     * Set the values of all selected tagged entities to 'dialogValues'.
     * This is triggered by the dialog box and cwrc dialogs.
     */
    async updateAllSelected(dialogValues) {
        Utility.log(Controller, "updateAllSelected");
        Utility.enforceTypes(arguments, EntityValues);
        if (await this.model.updateAllSelected() !== 0){
            this.model.saveState();
        }
    }
    async mergeSelectedEntities() {
        Utility.log(Controller, "mergeSelectedEntities");
        Utility.enforceTypes(arguments);

        let entity = await this.model.mergeEntities(this.collection);
        this.model.getCollection().set(entity);
        this.model.saveState();
    }
    async tagSelectedRange() {
        Utility.log(Controller, "tagSelectedRange");
        Utility.enforceTypes(arguments);

        let entity = await this.model.tagSelection(window.getSelection());
        if (entity != null) this.model.getCollection().add(entity);        this.model.saveState();
    }
    untagAll() {
        Utility.log(Controller, "untagAll");
        Utility.enforceTypes(arguments);

        this.model.untagAllSelected();
        this.isSaved = false;
        this.model.saveState();
    }
    async loadDocument(filename, text, action) {
        Utility.log(Controller, "loadDocument");
        Utility.enforceTypes(arguments, String, String, String);

        let encodeResponse = null;
        switch (action) {
            case "OPEN":
                encodeResponse = await this.scriber.encode(text);
                break;
            case "EDIT":
                encodeResponse = await this.scriber.edit(text);
                break;
            case "TAG":
                encodeResponse = await this.scriber.tag(text);
                break;
        }

        encodeResponse.setFilename(filename);
        await this.model.setDocument(encodeResponse.text, encodeResponse.context, encodeResponse.filename, encodeResponse.schemaURL);
        this.isSaved = true;
    }
    async saveContents() {
        Utility.log(Controller, "saveContents");
        Utility.enforceTypes(arguments, ["optional", Function], ["optional", Function]);

        this.view.showThrobber(true);
        this.unselectAll();
        let contents = "<doc>" + this.model.getDocument().html() + "</doc>";
        let result = await this.scriber.decode(contents);
        FileOperations.saveToFile(result, this.model.getFilename());
        this.isSaved = true;
        this.view.showThrobber(false);
    }
    goLink() {
        Utility.log(Controller, "goLink");
        Utility.enforceTypes(arguments);
        let url = $("#txtLink").val();
        if (url.length === 0) return;
        if (!url.startsWith("http") && !url.startsWith("https")) {
            url = "http://" + $("#txtLink").val();
        }
        var win = window.open(url, '_blank');
        win.focus();
    }
}