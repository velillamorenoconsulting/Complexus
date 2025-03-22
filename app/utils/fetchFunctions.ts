import axios from "axios";
import { ServerResponse } from "../types/responses";
import { User } from "../api/entities/user.entity";
import { FetchState } from "../types/types";
import { Member } from "../api/entities/member.entity";
import { Event } from "../api/entities/event.entity";
import { Question } from "../api/entities/question.entity";
import { Item } from "../api/entities/item.entity";
import { Testimony } from "../api/entities/testimony.entity";

export async function fetchOperation<T>(
  method: "post" | "get",
  path: string,
  body?: unknown,
  params?: string,
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_BE_URL}/${path}${params ? `/${params}` : ""}`;
  if (method === "post") {
    if (!body) throw Error("Body is needed for POST operations");
    const { data } = await axios.post<ServerResponse<T>>(url, body);
    return data.message;
  } else {
    const { data } = await axios.get<ServerResponse<T>>(url);
    return data.message;
  }
}

type FetchStateOpts = {
  path: string;
  method: "get" | "post";
  params?: string;
};

export async function fetchStateChange<T>(
  { path, method, params }: FetchStateOpts,
  changeDataState: (dispatcher: FetchState<T>) => void,
  changeLoadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  if (changeLoadingState) {
    changeLoadingState(true);
  }
  try {
    const result = await fetchOperation<T>(method, path, params);
    changeDataState({ refetch: false, value: result });
  } catch (e) {
    console.log(`Error while fetching ${path}`, e);
  } finally {
    if (changeLoadingState) {
      changeLoadingState(false);
    }
  }
}

export async function fetchUserList(
  changeState: (dispatcher: FetchState<User[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<User[]>(
    {
      path: "user",
      method: "get",
    },
    changeState,
    loadingState,
  );
}

export async function fetchMemberList(
  changeState: (dispatcher: FetchState<Member[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<Member[]>(
    {
      path: "member",
      method: "get",
    },
    changeState,
    loadingState,
  );
}

export async function fetchEventList(
  changeState: (dispatcher: FetchState<Event[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<Event[]>(
    {
      path: "event?relations=true",
      method: "get",
    },
    changeState,
    loadingState,
  );
}

export async function fetchQuestionList(
  changeState: (dispatcher: FetchState<Question[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<Question[]>(
    {
      path: "question",
      method: "get",
    },
    changeState,
    loadingState,
  );
}

export async function fetchPubList(
  changeState: (dispatcher: FetchState<Item[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<Item[]>(
    {
      path: "items",
      method: "get",
    },
    changeState,
    loadingState,
  );
}

export async function fetchTestimonyList(
  changeState: (dispatcher: FetchState<Testimony[]>) => void,
  loadingState?: (dispatcher: boolean) => void,
): Promise<void> {
  fetchStateChange<Testimony[]>(
    {
      path: "testimony",
      method: "get",
    },
    changeState,
    loadingState,
  );
}
