var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .sort('date')
    .exec(afterQuery)
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newPost = new models.Project({
      "title": form_data.project_title,
      "image": form_data.image_url,
      "date": form_data.data,
      "summary": form_data.summary
  });

  newPost.save(afterSaving);

  function afterSaving(err){
    if(err) console.log(err);
    res.redirect('/');
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterDelete);

  function afterDelete(err){
    if(err) console.log(err);
    res.send();
  } 
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}