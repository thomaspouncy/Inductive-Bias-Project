import model
import execute_experiment as ee
import agent


class TestExecuteExperiment(object):
    def __init__(self):
        self.model = model.GM()
        self.transfer_curriculum = ([self.model.generate_task() for _ in range(20)], 5)

    def test_pre_trains_only_when_asked(self):
        agent_1 = agent.Agent()
        ee.ExecuteExperiment([([], 0), ([], 0)], self.model, agent_1)
        assert agent_1.get_training_specs().values() == []
        ee.ExecuteExperiment([([], 0), ([], 0)], self.model, agent_1, [100, 10])
        assert agent_1.get_training_specs().values() == [10] * 100

    def test_training_curriculum_executed_fully(self):
        num_tasks, num_levels = 20, 100
        training_curriculum = ([self.model.generate_task() for _ in range(num_tasks)], num_levels)

        # without pre_training
        agent_1 = agent.Agent()
        ee.ExecuteExperiment([training_curriculum, ([], 0)], self.model, agent_1)
        training_specs = agent_1.get_training_specs()
        for task in training_curriculum[0]:
            assert task.get_task()['task_id'] in training_specs.keys()

        # with pre_training
        agent_2 = agent.Agent()
        ee.ExecuteExperiment([training_curriculum, ([], 0)], self.model, agent_2, [100, 100])
        training_specs = agent_2.get_training_specs()
        for task in training_curriculum[0]:
            assert task.get_task()['task_id'] in training_specs.keys()

    def test_transfer_curriculum_executed_fully(self):
        agent_1 = agent.Agent()
        num_tasks, num_levels = 20, 100
        transfer_curriculum = ([self.model.generate_task() for _ in range(num_tasks)], num_levels)
        expr = ee.ExecuteExperiment([([], 0), transfer_curriculum], self.model, agent_1)
        results = expr.get_results()['transfer']
        for task in transfer_curriculum[0]:
            assert task.get_task()['task_id'] in results.keys()


class TestModel(object):
    def __init__(self):
        self.model = model.GM()


test = TestExecuteExperiment()
test.test_pre_trains_only_when_asked()
test.test_training_curriculum_executed_fully()
