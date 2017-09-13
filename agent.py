import random

class Agent(object):
    def __init__(self):
        self.parameters = None

    def attempt_task_level(self, task, level, training=False, max_num_actions=100):
        current_state = level
        result = 0
        while not result and max_num_actions != 0:
            action = self.get_action(current_state, task)
            current_state = current_state.get_consequent_state(action)
            result = self.is_goal_achieved(task.get_task()['goal'], current_state)
            max_num_actions -= 1
            if training: self.update_params()

        return result

    def get_action(self, state, task):
        return [random.choice(state.get_objects().values()), random.choice(task.get_task()['possible_actions'])]

    def is_goal_achieved(self, goal, state):
        if random.random() < 0.005: return 1
        return 0

    def update_params(self):
        self.parameters = None
        