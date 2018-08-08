const TagInfo = require("./TagInfo");
class Context {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.context.Context";
	}
	static __isEnum() {
		return false;
	}
	hasTagSourceAttribute() {
		return !this.tagSourceAttribute.isEmpty();
	}
	getTagSourceAttribute() {
		return this.tagSourceAttribute;
	}
	hasScriptFilename() {
		return !this.scriptFilename.isEmpty();
	}
	getScriptFilename() {
		return this.scriptFilename;
	}
	getName() {
		return this.name;
	}
	getSchemaName() {
		return this.schemaName;
	}
	styles() {
		return this.styleList;
	}
	tags() {
		return this.tagList;
	}
	getTagInfo(standardTagName) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getStandard() === standardTagName)return tagInfo;
			
		}
		throw new Error("ca.sharcnet.nerve.context.ContextException");
	}
	getStandardTag(schemaTagName) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getName() === schemaTagName)return tagInfo.getStandard();
			
		}
		throw new Error("ca.sharcnet.nerve.context.ContextException");
	}
	isTagName(schemaTagName) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getName() === schemaTagName)return true;
			
		}
		return false;
	}
	isStandardTag(schemaTagName) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getStandard() === schemaTagName)return true;
			
		}
		return false;
	}
};

if (typeof module !== "undefined") module.exports = Context;