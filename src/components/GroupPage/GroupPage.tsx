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

export const GroupPage = () => {
  const groups = useGroups();
  return (
    <View activePanel="groups">
      <Panel id="groups" aria-live="polite" aria-busy={groups === undefined}>
        <PanelHeader />
        {!groups.response ? (
          <PanelSpinner size="large">Идёт загрузка...</PanelSpinner>
        ) : (
          <Group header={<Header mode="secondary">Мои группы</Header>}>
            {groups.data.length === 0 ? (
              <Placeholder icon={<Icon56UsersOutline />}>
                Сообществ пока нет:(
              </Placeholder>
            ) : (
              <>
                <FiltersBar colors={groups.colors} privacy={groups.privacy} />
                <Spacing size={24}>
                  <Separator />
                </Spacing>
                <GroupList groups={groups.data} />
              </>
            )}
          </Group>
        )}
      </Panel>
    </View>
  );
};
