import { useCallback, useEffect, useMemo, useState } from "react";
import { ToDoType } from "../store/toDoSlice";
import { useStoreHooks } from "./storeHooks";
import { Button } from "../components/ui/button/button";

export enum ListType {
    list,
    doneList,
    inProcessList,
    basketList,
    values,
}

export function useSelectList() {
    const { toDoList, doneList, inProcessList, basketList  } =
    useStoreHooks();
    const listMemo = useMemo(() => toDoList, [toDoList]);
    const doneListMemo = useMemo(() => doneList, [doneList]);
    const inProcessListMemo = useMemo(() => inProcessList, [inProcessList]);
    const basketListMemo = useMemo(() => basketList, [basketList]);

    const listsBtns = [
      { name: 'Все', type: ListType.list,  action: listMemo},
      { name: 'Готовые', type: ListType.doneList, action:  doneListMemo},
      { name: 'В процессе', type: ListType.inProcessList, action:  inProcessListMemo},
      { name: 'Корзина', type: ListType.basketList, action:  basketListMemo},
    ];

    const [list, setList] = useState<ToDoType[]>(listMemo);
    const [listType, setListType] = useState<ListType>(ListType.list);


    useEffect(() => {
      listsBtns.map((elem)=>{if (listType === elem.type) {
        setList(elem.action);
      }})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType, listMemo]);

    const onSelect = useCallback(
      (type: ListType) => {
        setListType(type);
      },
      [setListType],
    );
  
    const btnsList = listsBtns.map((elem) => (
      Button( {active: listType === elem.type, onClick:() => onSelect(elem.type), text: `${elem.name} (${elem.action.length})`} )
    ))

    return { list, listType,  btnsList };
  }
