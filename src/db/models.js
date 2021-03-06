/**
 * Created by tech4GT on 9/30/18.
 */

const db_config = require('../../db_config'),Sequelize = require('sequelize'),seq = new Sequelize(db_config.DATABASE_URL,{
    pool: {
        min: 0,
        max: 5,
        idle: 1000
    }
});

/* Table to store Teachers */
const Teacher = seq.define('teacher',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: Sequelize.STRING,allowNull: false},
    designation: Sequelize.STRING,
    description: Sequelize.STRING,
    picture: {type: Sequelize.STRING, isUrl: true}
});

/* Table to store Posts */
const Post = seq.define('post',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    content: {type: Sequelize.STRING, allowNull: false},
    rating: {type: Sequelize.INTEGER, allowNull: false,min: 0,max: 5},
    year: Sequelize.INTEGER
});

/* Table to store Admins */
const Admin = seq.define('admin',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull:false},
    picture: {type: Sequelize.STRING, isUrl:true},
    grant: {type: Sequelize.BOOLEAN, default: false}
});

/* Table to store Courses */
const Course = seq.define('course',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull:false},
    code: {type: Sequelize.STRING, unique: true, allowNull: false},
    description: Sequelize.STRING
});

Post.belongsTo(Teacher);
Teacher.hasMany(Post);

Post.belongsTo(Course);
Course.hasMany(Post);


module.exports = {
    Teacher,
    Post,
    Admin,
    Course: Course,
    sequelize: seq
};