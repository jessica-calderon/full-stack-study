let groups = [];

module.exports = {
    newGroup : function(title, memberLimit, password) {
        let group = new Group(title, memberLimit, password);
        groups.push(group);
        return group;
    },
    getGroup: function(groupId) {
        return groups.find(targetGroup => targetGroup.id == groupId);
    }
}