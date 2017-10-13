
var gameParams = {
    objects : new Array(),
    interactions : new Array(),
    propositions : new Array(),

    init : function() {
        // level_objects, task_interactions and task_propositions loaded from database
        for (i = 0; i < level_objects.length; i++) {
            var obj_i = level_objects[i].fields.obj_id;
            gameParams.interactions[obj_i] = new Array();
            for (j = 0; j < level_objects.length; j++) {
                var obj_j = level_objects[j].fields.obj_id;
                if (obj_i != 'Avatar' && obj_j != 'Avatar') {
                    var fields = { actor_id: obj_i, obj_id: obj_j};
                    gameParams.interactions[obj_i][obj_j] = Actions['push'](fields);
                } else { gameParams.interactions[obj_i][obj_j] = 0; }
            }
        }
        gameParams.load_objects();
        gameParams.load_interactions();
        gameParams.load_propositions();
    },
    load_objects : function() {
        Object.keys(level_objects).forEach(function(key) {
            var fields = level_objects[key].fields;
            gameParams.objects[fields.obj_id] = Shapes[fields.shape](fields);
        });
    },
    load_interactions : function() {
        Object.keys(task_interactions).forEach(function(key) {
            var fields = task_interactions[key].fields;
            gameParams.interactions[fields.actor_id][fields.obj_id] = Actions[fields.action](fields);
        });
    },
    load_propositions : function() {
        Object.keys(task_propositions).forEach(function(key) {
            gameParams.propositions.push(task_propositions[key].fields);
        });
    },
};
