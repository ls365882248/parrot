import { SubmitButton } from '@/components/submit-button';
import { chatService } from '@/services';
import { Select, Form, Button, Checkbox, Input } from '@arco-design/web-react';
import * as React from 'react';
import { useRequest } from 'ahooks';
import { Chat } from '@/components/chat';
import { IChat } from '@/model';
import { get } from 'lodash-es';
import dayjs from 'dayjs';

function Component() {
  const [params, setParams] = React.useState<string>();
  const { data, error, loading, run } = useRequest(
    () =>
      chatService.genWeekly(
        'weekly',
        params,
        {},
        'd3faab44c41211ed9db01831bfb96e81'
      ),
    {
      manual: true,
      refreshDeps: [params],
    }
  );
  const [chats, setChats] = React.useState<IChat[]>([]);

  React.useEffect(() => {
    if (!error) return;
    chats.pop();
    setChats([
      ...chats,
      {
        text: '生成失败',
        time: dayjs().format('HH:mm'),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, chats.length]);

  React.useEffect(() => {
    if (params) {
      run();
    }
  }, [params, run]);

  React.useEffect(() => {
    const text = get(data, 'data.result', '');
    if (!text) return;
    chats.pop();
    setChats([
      ...chats,
      {
        text,
        time: dayjs().format('HH:mm'),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, chats.length]);

  const onGeneration = (text: string) => {
    const nextChats = [
      ...chats,
      {
        text,
        time: dayjs().format('HH:mm'),
        reverse: true,
      },
      {
        text: '生成中...',
        time: dayjs().format('HH:mm'),
      },
    ];
    setChats(nextChats);
    setParams(text);
  };

  return (
    <div style={{ height: '100%' }}>
      <Chat chats={chats} onGeneration={onGeneration} loading={loading} />
    </div>
  );
}

export default Component;
