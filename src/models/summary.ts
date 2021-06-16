import loading from "@/components/Loading";
import { getIpList, getNodeTotal, getWebTotal } from "@/services/api";
import { Subscription, Reducer, Effect } from "umi";
export interface SummaryModelState {}

export interface SummaryModelType {
  namespace: "summary";
  state: SummaryModelState;
  effects: {
    getIpList: Effect;
    getWebTotal: Effect;
    getNodeTotal: Effect;
  };
  reducers: {
    saveData: Reducer<SummaryModelState>;
  };
  subscriptions: { setup: Subscription };
}

const SummaryModel: SummaryModelType = {
  namespace: "summary",

  state: {},

  effects: {
    *getIpList({ payload, callback }, { call, put }) {
      loading.start();
      const response = yield call(getIpList);
      if (response) {
        callback(response.ip_list || []);
      }
      setTimeout(() => {
        loading.end();
      }, 30);
    },
    *getNodeTotal({ payload, callback }, { call, put }) {
      const response = yield call(getNodeTotal, { ...payload });
      console.log(response, "...");
      if (response) {
        callback(response || {});
      } else {
        callback({});
      }
    },
    *getWebTotal({ payload, callback }, { call, put }) {
      const result = yield call(getWebTotal);
      if (result) {
        callback(result);
      }
    },
  },

  reducers: {
    saveData(state, { payload, type }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ history }): void {},
  },
};

export default SummaryModel;
