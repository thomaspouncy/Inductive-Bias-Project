from InductiveBiasEvaluator.TaskModels.LOTGTaskModel import LOTGTaskHypothesis
from InductiveBiasEvaluator.State import State
from InductiveBiasEvaluator.Task import Task
import random

class Planner(ojbect):
	def __init__(self, state, actions=["w", "a", "s", "d"], task, reward):
		self.state = state
		self.actions = actions
		self.task = task
		self.reward = 0

	def simulate_game(self, steps):
		curr_state = self.state
		result = {}
		for task in self.task:
			for i in range(steps):
				next_action = self.get_next_move(curr_state, task) # get next best move
				next_state = self.perform_action(curr_state, next_action)
				self.reward = give_reward(curr_state, task)
				curr_state = next_state

				result[i] = self.reward
		return max(result)

	def get_next_move(self, task):
		return random.choice(task.get_task()[self.actions]) # for now it's random

	def perform_action(state, action):
		return NotImplementedError

	def give_reward(self, state, task):
		if task.self.completed:
			return self.reward += 10
		else:
			return self.reward -= 1

	def completed(self, task):
		return NotImplementedError