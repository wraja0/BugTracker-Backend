require('../config/db.connection');

module.exports = {
    User: require('./userModel'),
    AllBugs: require('./allBugsModel'),
    Comments: require('./commentsModel'),
    Tests: require('./testsModel'),
    BugVH: require('./bugVhModel')
}