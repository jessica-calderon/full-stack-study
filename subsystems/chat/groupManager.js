/*
    groupManager.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:47:22
    
    Description:
        Module for managing the group instances at a high level.
    
    Documentation:
        .newGroup(title : string, memberLimit : number?, password : string?) : Group
            -> Creates a new group and returns it.

        .getGroup(id : string) : Group
            -> Returns the group with the given id.
*/

const Group = require("./classes/Group");

let groups = [];

module.exports = {
    exportAll: function() {
        return groups.map(group => group.export());
    },
    newGroup : function(title, memberLimit, password) {
        let group = new Group(title, memberLimit, password);
        groups.push(group);
        return group;
    },
    getGroup: function(groupId) {
        return groups.find(targetGroup => targetGroup.id == groupId);
    }
}