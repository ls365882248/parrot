import { IModule } from '@/model';
import { $http } from '@/utils/http';
import { get, pick } from 'lodash-es';

class ChatService {
  async genWeekly(module: IModule, text: string, params, session_id: string) {
    const res = await $http.post<Promise<ISafeAny>>(
      'http://47.103.101.101/api/generate',
      {
        module,
        text,
        params,
        session_id,
      }
    );
    return res.data;
  }
}

export const chatService = new ChatService();
