import random


class Agent(object):
    def __init__(self):
        self.parameters = 0.005
        self.training_specs = {}

    def attempt_task_level(self, task, level, training=False, max_num_actions=10):
        if training:
            if task.get_task()['task_id'] not in self.training_specs.keys():
                self.training_specs[task.get_task()['task_id']] = 1
            else:
                self.training_specs[task.get_task()['task_id']] += 1
        current_state = level
        result = 0
        while not result and max_num_actions != 0:
            action = self.get_action(current_state, task)
            current_state = current_state.get_consequent_state(action)
            result = self.is_goal_achieved(task.get_task()['goal'], current_state)
            max_num_actions -= 1
            if training:
                self.update_params()
        return result

    def get_action(self, state, task):
        return [random.choice(state.get_objects().values()), random.choice(task.get_task()['possible_actions'])]

    def is_goal_achieved(self, goal, state):
        if random.random() < self.parameters:
            return 1
        return 0

    def update_params(self):
        self.parameters += 0.000005

    def get_training_specs(self):
        return self.training_specs
