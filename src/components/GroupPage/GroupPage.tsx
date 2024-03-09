import { Group, Header, Panel, PanelHeader, View } from "@vkontakte/vkui";

import { GroupList } from "../GroupList/GroupList";
import { useEffect, useState } from "react";
import { GroupType } from "../../types/types";
import { API_URL, getData } from "../../utils/api-utils";

export const GroupPage = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const groups = await getData(API_URL!);
      setGroups(groups.data!);
    };
    const timeout = setTimeout(() => {
      fetchGroup();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <View activePanel="groups">
      <Panel id="groups">
        <PanelHeader />
        <Group header={<Header mode="secondary">Мои группы</Header>}>
          <GroupList groups={groups} />
        </Group>
      </Panel>
    </View>
  );
};
