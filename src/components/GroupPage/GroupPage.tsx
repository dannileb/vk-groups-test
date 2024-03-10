import {
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Separator,
  Spacing,
  View,
} from "@vkontakte/vkui";
import { GroupList } from "../GroupList/GroupList";
import { useGroups } from "../../hooks/useGroups";
import { Icon56UsersOutline } from "@vkontakte/icons";
import { FiltersBar } from "../FiltersBar/FiltersBar";
import { useGroupFiltersStore } from "../../stores/group-store";

export const GroupPage = () => {
  const groups = useGroups(["avatar_color", "closed"]);
  const groupsFiltersStore = useGroupFiltersStore();
  return (
    <View activePanel="groups">
      <Panel id="groups" aria-live="polite" aria-busy={groups === undefined}>
        <PanelHeader>Мои группы</PanelHeader>
        {!groups.response ? (
          <PanelSpinner size="large">Идёт загрузка...</PanelSpinner>
        ) : (
          <Group>
            {groups.data.length === 0 ? (
              <Placeholder icon={<Icon56UsersOutline />}>
                Сообществ пока нет:(
              </Placeholder>
            ) : (
              <>
                <FiltersBar
                  colors={groups.filters.avatar_color}
                  privacy={groups.filters.closed.map(String)}
                  friends={[]}
                />
                <Spacing size={24}>
                  <Separator />
                </Spacing>
                <GroupList groups={groupsFiltersStore.displayGroups} />
              </>
            )}
          </Group>
        )}
      </Panel>
    </View>
  );
};
