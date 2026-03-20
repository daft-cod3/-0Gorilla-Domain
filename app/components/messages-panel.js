"use client";

import { useState } from "react";

const initialThreads = [
  {
    id: "diaz",
    teacher: "Ms. Diaz",
    course: "Pronunciation coach",
    preview: "Please review the new roundabout video before tomorrow.",
    unread: 2,
    messages: [
      {
        id: "diaz-1",
        sender: "teacher",
        text: "Please review the new roundabout video before tomorrow.",
        time: "08:12",
      },
      {
        id: "diaz-2",
        sender: "student",
        text: "I have started it. I will send questions after the quiz.",
        time: "08:20",
      },
      {
        id: "diaz-3",
        sender: "teacher",
        text: "Good. Use the flash cards too, especially for the warning signs.",
        time: "08:24",
      },
    ],
  },
  {
    id: "chen",
    teacher: "Mr. Chen",
    course: "Road signs",
    preview: "The image set has been updated with new priority signs.",
    unread: 0,
    messages: [
      {
        id: "chen-1",
        sender: "teacher",
        text: "The image set has been updated with new priority signs.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "omar",
    teacher: "Ms. Omar",
    course: "Quizzes",
    preview: "Your traffic flow checkpoint opens at 4:00 PM.",
    unread: 1,
    messages: [
      {
        id: "omar-1",
        sender: "teacher",
        text: "Your traffic flow checkpoint opens at 4:00 PM.",
        time: "09:03",
      },
    ],
  },
];

export default function MessagesPanel() {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState(initialThreads[0].id);
  const [draft, setDraft] = useState("");

  const activeThread =
    threads.find((thread) => thread.id === activeThreadId) ?? threads[0];

  function handleSelectThread(threadId) {
    setActiveThreadId(threadId);
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              unread: 0,
            }
          : thread,
      ),
    );
  }

  function handleSendMessage(event) {
    event.preventDefault();

    const message = draft.trim();

    if (!message) {
      return;
    }

    setThreads((current) =>
      current.map((thread) => {
        if (thread.id !== activeThreadId) {
          return thread;
        }

        return {
          ...thread,
          preview: message,
          messages: [
            ...thread.messages,
            {
              id: `${thread.id}-${thread.messages.length + 1}`,
              sender: "student",
              text: message,
              time: "Just now",
            },
          ],
        };
      }),
    );
    setDraft("");
  }

  return (
    <section className="messages-page">
      <div className="messages-hero">
        <div>
          <div className="messages-eyebrow">Messages</div>
          <h1 className="messages-title">Teacher conversations</h1>
          <p className="messages-subtitle">
            Receive updates, ask questions, and send work back to your teacher.
          </p>
        </div>
        <div className="messages-status-card">
          <span className="messages-status-label">Response window</span>
          <strong>Usually under 20 minutes</strong>
        </div>
      </div>

      <div className="messages-layout">
        <aside className="messages-sidebar">
          {threads.map((thread) => {
            const isActive = thread.id === activeThreadId;

            return (
              <button
                key={thread.id}
                className={`message-thread ${isActive ? "active" : ""}`}
                type="button"
                onClick={() => handleSelectThread(thread.id)}
              >
                <span className="message-thread-avatar">
                  {thread.teacher
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="message-thread-copy">
                  <span className="message-thread-head">
                    <strong>{thread.teacher}</strong>
                    {thread.unread ? (
                      <span className="message-thread-unread">
                        {thread.unread}
                      </span>
                    ) : null}
                  </span>
                  <span className="message-thread-course">{thread.course}</span>
                  <span className="message-thread-preview">{thread.preview}</span>
                </span>
              </button>
            );
          })}
        </aside>

        <div className="messages-window">
          <div className="messages-window-head">
            <div>
              <div className="messages-window-title">{activeThread.teacher}</div>
              <div className="messages-window-meta">{activeThread.course}</div>
            </div>
            <span className="messages-online-pill">Available</span>
          </div>

          <div className="messages-feed">
            {activeThread.messages.map((message) => (
              <article
                key={message.id}
                className={`message-bubble ${
                  message.sender === "student" ? "outgoing" : "incoming"
                }`}
              >
                <p>{message.text}</p>
                <span>{message.time}</span>
              </article>
            ))}
          </div>

          <form className="messages-composer" onSubmit={handleSendMessage}>
            <label className="sr-only" htmlFor="message-draft">
              Send a message
            </label>
            <textarea
              id="message-draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Send a message to your teacher"
              rows={3}
            />
            <button className="messages-send" type="submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
