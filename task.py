from itertools import product
from copy import deepcopy
import numpy as np


object_primitives = \
        {'exists': [False, True],
         'pos': list(product([0, 1, 2, 3, 4], [0, 1, 2, 3, 4])),
         'color': ["red", "blue", "green", "yellow"],
         'shape': ["circle", "star", "square", "triangle"]}


class State(object):
    def __init__(self, objects, width=5, height=5):
        self.objects = objects
        self.board_width, self.board_height = width, height
        self.points = 0
        self.game_state = 0
        self.board = []
        self.update_board()

    def update_board(self):
        self.board = []
        for x in range(self.board_width):
            self.board.append([""] * self.board_height)
        for obj_id, obj in self.objects.iteritems():
            exists = obj['exists']
            x, y = obj['pos']
            if exists and x >= 0 and y >= 0:
                self.board[x][y] = obj_id

    def get_board(self):
        return self.board

    def get_objects(self):
        return self.objects

    def get_consequent_state(self, action):
        if action:
            return self


class Task(object):
    def __init__(self, task_id, goal, object_classes, avatar_id, interactions, possible_actions):
        self.task_id = task_id
        self.goal = goal
        self.object_classes = object_classes
        self.avatar_id = avatar_id
        self.interactions = interactions
        self.possible_actions = possible_actions

    def get_task(self):
        return \
            {'task_id': self.task_id,
             'goal': self.goal,
             'object_classes': self.object_classes,
             'avatar_id': self.avatar_id,
             'possible_actions': self.possible_actions,
             'interactions': self.interactions}

    def generate_level(self):
        instance = deepcopy(self.object_classes)
        for obj in instance.values():
            for feature in obj.keys():
                obj[feature] = object_primitives[feature][np.argmax(np.random.multinomial(1, obj[feature]))]
        return State(instance)
