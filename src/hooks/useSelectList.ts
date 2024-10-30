import { useEffect, useMemo, useState } from "react";
import { ToDoType } from "../store/toDoSlice";
import { useStoreHooks } from "./storeHooks";

export enum ListType {
    list,
    doneList,
    inProcessList,
    basketList,
}

export function useSelectList() {
    const { toDoList, doneList, inProcessList, basketList  } =
    useStoreHooks();
    const listMemo = useMemo(() => toDoList, [toDoList]);
    const doneListMemo = useMemo(() => doneList, [doneList]);
    const inProcessListMemo = useMemo(() => inProcessList, [inProcessList]);
    const basketListMemo = useMemo(() => basketList, [basketList]);

    

    const [list, setList] = useState<ToDoType[]>(listMemo);
    const [listType, setListType] = useState<ListType>(ListType.list);


    useEffect(() => {
      if (listType === ListType.doneList) {
        setList(doneListMemo);
      } else if (listType === ListType.inProcessList) {
        setList(inProcessListMemo);
      } else if (listType === ListType.basketList) {
        setList(basketListMemo);
      } else if (listType === ListType.list) {
        setList(listMemo);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType, listMemo]);

    return { list, listType, setListType };
  }
