import { formatDate } from '../utils/dateUtil';

const TaskDetails = ({ task }) => {
    const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysLeft < 0;

    return (
        <div className="px-4 pb-2 bg-white rounded-xl">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{task.title}</h2>
            <p className="mb-4 text-gray-700">{task.description}</p>

            <div className="flex justify-between items-center mb-4">
                <p
                    className={`text-sm font-medium mb-2 px-4 py-1 rounded-2xl w-fit ${task.category === 'Work' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                            task.category === 'Personal' ? 'bg-[#D1FAE5] text-[#065F46]' :
                                task.category === 'Urgent' ? 'bg-[#FEE2E2] text-[#B91C1C]' :
                                    'bg-gray-100 text-gray-600'
                        }`}
                >
                    {task.category}
                </p>

                <span className="text-sm font-medium text-gray-600">
                    Created: {formatDate(task.createdAt)}
                </span>
            </div>

            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                    Due: {formatDate(task.dueDate)}
                </span>
                <span
                    className={`text-sm font-semibold ${isOverdue ? 'text-red-500' : 'text-green-600'
                        }`}
                >
                    {isOverdue ? `Overdue by ${Math.abs(daysLeft)} days` : `${daysLeft} days left ⏳`}
                </span>
            </div>

            <div className="text-sm font-medium">
                Status: {task.completed ? <span className="text-green-600">✅ Completed</span> : <span className="text-yellow-600">⏳ Incomplete</span>}
            </div>
        </div>
    );
};

export default TaskDetails;
