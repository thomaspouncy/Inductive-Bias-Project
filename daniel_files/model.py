import random
from itertools import product
import task


class GM(object):
    def __init__(self):
        self.model_id = '_GM_001'
        self.task_ids = 0
        self.goals = ['goal_1', 'goal_2', 'goal_3' 'goal_n']
        self.object_classes = {}
        for obj_name in ['objClass_1', 'objClass_2', 'objClass_3', 'objClass_n']:
            self.object_classes[obj_name] = \
                {'exists': [1. / 2.] * 2, 'pos': [1. / 25.] * 25, 'color': [1. / 4.] * 4, 'shape': [1. / 4.] * 4}
        self.effects = ['changeColor', 'changeSize', 'changePosition', 'removeObject', 'none']
        self.possible_actions = ['Right', 'Left', 'Forward']

    @staticmethod
    def get_model_id():
        return "GM_001"

    def generate_task(self):
        goal = random.choice(self.goals)
        avatar_id = random.choice(self.object_classes.keys())
        interactions = dict()
        for pair in product(self.object_classes, self.object_classes):
            interactions[pair] = random.choice(self.effects)
        task_id = 'task_' + str(self.task_ids) + self.model_id
        self.task_ids += 1
        return task.Task(task_id, goal, self.object_classes, avatar_id, interactions, self.possible_actions)
