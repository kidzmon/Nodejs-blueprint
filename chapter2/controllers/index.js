// index controller
exports.show = function(req,res){
  // show index contents
  res.render('index',{
    title: 'Express'
  });
};