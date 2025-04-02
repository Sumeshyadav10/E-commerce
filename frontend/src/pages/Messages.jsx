import { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const messages = [
  {
    id: 1,
    sender: 'John Doe',
    email: 'john@example.com',
    subject: 'Product Inquiry',
    message: 'I would like to know more about your product specifications.',
    date: '2024-03-27',
    status: 'Unread',
  },
  {
    id: 2,
    sender: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Order Issue',
    message: 'I have not received my order yet. Can you help me track it?',
    date: '2024-03-26',
    status: 'Read',
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'Return Request',
    message: 'I would like to return a product I purchased recently.',
    date: '2024-03-25',
    status: 'Replied',
  },
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (messageId) => {
    // TODO: Implement actual reply logic
    toast.success('Reply sent successfully!');
    setReplyText('');
  };

  const handleDelete = (messageId) => {
    // TODO: Implement actual delete logic
    toast.success('Message deleted successfully!');
  };

  const handleStatusChange = (messageId, newStatus) => {
    // TODO: Implement actual status change logic
    toast.success(`Message marked as ${newStatus}`);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Messages List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Messages</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedMessage?.id === message.id ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.sender}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    message.status === 'Unread'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : message.status === 'Read'
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {message.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                {message.subject}
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {message.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From: {selectedMessage.sender} ({selectedMessage.email})
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage.id,
                        selectedMessage.status === 'Unread' ? 'Read' : 'Unread'
                      )
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {selectedMessage.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-gray-700 dark:text-gray-300">{selectedMessage.message}</p>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
                <button
                  onClick={() => handleReply(selectedMessage.id)}
                  disabled={!replyText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 