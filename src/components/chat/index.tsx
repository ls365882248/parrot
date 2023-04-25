/* eslint-disable max-len */
import { IChat } from '@/model';
import React, { useEffect, useRef } from 'react';
import { get } from 'lodash-es';
import classNames from 'classnames';
import { Avatar, Grid, Input, Loading, Button } from '@nextui-org/react';
import './index.less';

interface IProps {
  chats: IChat[];
  loading?: boolean;
  onGeneration?: (val: string) => void;
}

const AskChat = (props: { chat: IChat }) => {
  const { text, time } = props.chat;
  return (
    <div className="message-wrapper reverse">
      <Avatar squared text="Ask" />
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
      <Avatar squared text="GPT" />
      <div className="message-box-wrapper">
        <div className="message-box">{text}</div>
        <span>{time}</span>
      </div>
    </div>
  );
};

export const Chat = (props: IProps) => {
  const { chats = [], onGeneration = () => {}, loading = false } = props;
  const inputRef = useRef<any>();

  const onSend = () => {
    if (loading) return;
    const text = get(inputRef, 'current.value');
    if (!text) return;
    onGeneration(text);
  };

  useEffect(() => {
    if (loading === false) {
      inputRef!.current.value = '';
    }
  }, [loading]);

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
        <Input
          // clearable
          ref={inputRef}
          disabled={loading}
          // underlined
          contentRightStyling={false}
          placeholder="请输入..."
          contentRight={
            <Button
              size="sm"
              className="send-button"
              disabled={loading}
              onClick={onSend}
              style={{
                marginRight: '4px',
                minWidth: '40px',
                width: '60px',
              }}
            >
              {loading ? '生成中...' : '生成'}
            </Button>
          }
        />
      </div>
    </div>
  );
};
