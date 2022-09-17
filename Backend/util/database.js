const Sequelize=require('sequelize');

const sequelize=new Sequelize('ecommerce','root','S@marth12',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;