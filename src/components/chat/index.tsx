/* eslint-disable max-len */
import { IChat } from '@/model';
import React, { useRef } from 'react';
import './index.less';

const DEFAULT_CHATS: IChat[] = [
  {
    text: '可以帮我生成一份周报吗',
    time: '9h ago',
    reverse: true,
  },
  {
    text: (
      <>
        当然可以！以下是一个简单的周报模板，你可以根据自己的需要进行调整：
        周报（日期范围） 工作总结：
        <br />
        工作项1：在本周，我完成了工作项1，并且达到了预期的目标。我遇到了一些困难，但我通过仔细分析和解决问题，最终取得了成功。
        <br />
        工作项2：在本周，我继续进行工作项2，并取得了进展。我还需要更多的时间和资源来完成这个任务，但我已经采取了措施来确保它能够按时完成。
        <br />
        工作项3：我开始了工作项3，并在本周取得了一些进展。我需要更多的时间和资源来完成这个任务，并计划在下周继续进行。
        <br />
        下周计划：
        <br />
        工作项1：在下周，我计划继续进行工作项1，并尽可能地提高效率和质量。
        <br />
        工作项2：在下周，我将继续努力完成工作项2，并采取措施以确保它能够按时完成。
        <br />
        工作项3：在下周，我将继续进行工作项3，并争取在本周完成它。
        <br />
        需要协调的事项：
      </>
    ),
    time: '9h ago',
  },
];

interface IProps {
  chats: IChat[];
  onGeneration?: (val: string) => void;
}

const AskChat = (props: { chat: IChat }) => {
  const { text, time } = props.chat;
  return (
    <div className="message-wrapper reverse">
      <img
        className="message-pp"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        alt="profile-pic"
      />
      <div className="message-box-wrapper">
        <div className="message-box">{text}</div>
        <span>{time}</span>
      </div>
    </div>
  );
};

const AnswerChat = (props: { chat: IChat }) => {
  const { text, time } = props.chat;
  return (
    <div className="message-wrapper">
      <img
        className="message-pp"
        src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
        alt="profile-pic"
      />
      <div className="message-box-wrapper">
        <div className="message-box">{text}</div>
        <span>{time}</span>
      </div>
    </div>
  );
};

export const Chat = (props: IProps) => {
  const { chats = DEFAULT_CHATS, onGeneration = () => {} } = props;
  // const ref = useRef(onGeneration);
  // ref.current = onGeneration;
  const onSend = () => {
    onGeneration('xxxx');
  };
  return (
    <div className="app-container">
      <div className="app-main">
        <div className="chat-wrapper">
          {chats.map((chat: IChat, index: number) => {
            const { reverse } = chat;

            if (reverse) {
              return <AskChat chat={chat} key={index} />;
            }

            return <AnswerChat chat={chat} key={index} />;
          })}
        </div>
        <div className="chat-input-wrapper">
          <button className="chat-attachment-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-paperclip"
              viewBox="0 0 24 24"
            >
              <defs />
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <div className="input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Enter your message here"
            />
            <button className="emoji-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-smile"
                viewBox="0 0 24 24"
              >
                <defs />
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
              </svg>
            </button>
          </div>
          <button className="chat-send-btn" onClick={onSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
