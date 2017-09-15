

# experiment = (training_curriculum, transfer_curriculum)
# curriculum = ([tasks], num_levels_per_task)
class ExecuteExperiment(object):
    def __init__(self, experiment, model, agent, pre_training=None):
        self.training_curriculum, self.transfer_curriculum = experiment
        self.pre_training = pre_training
        self.agent = agent
        self.model = model

        # pre training = [num_pre_train_tasks, num_levels_per_task]
        if pre_training is None:
            pre_training = [0, 0]
        self.pre_train(pre_training[0], pre_training[1])

        # training and transfer curriculum
        self.results = {'training': {}, 'transfer': {}}
        self.execute_training_curriculum()
        self.execute_transfer_curriculum()

    def pre_train(self, num_pre_train_tasks, num_levels_per_task):
        for _ in range(num_pre_train_tasks):
            task = self.model.generate_task()
            for _ in range(num_levels_per_task):
                self.agent.attempt_task_level(task, task.generate_level(), training=True)

    def execute_training_curriculum(self):
        tasks, num_levels = self.training_curriculum
        for task in tasks:
            for _ in range(num_levels):
                result = self.agent.attempt_task_level(task, task.generate_level(), training=True)
                if task.get_task()['task_id'] in self.results['training'].keys():
                    self.results['training'][task.get_task()['task_id']].append(result)
                else:
                    self.results['training'][task.get_task()['task_id']] = [result]

    def execute_transfer_curriculum(self):
        tasks, num_levels = self.transfer_curriculum
        for task in tasks:
            for _ in range(num_levels):
                result = self.agent.attempt_task_level(task, task.generate_level(), training=False)
                if task.get_task()['task_id'] in self.results['transfer'].keys():
                    self.results['transfer'][task.get_task()['task_id']].append(result)
                else:
                    self.results['transfer'][task.get_task()['task_id']] = [result]

    def get_results(self):
        return self.results
