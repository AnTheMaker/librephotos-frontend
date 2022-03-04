import React from "react";
import { Menu, Loader } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

type Props = {
  activeTab: string;
  changeTab: (event: any, data: any) => void;
  fetchingLabeledFacesList: boolean;
  fetchingInferredFacesList: boolean;
};

export const TabComponent = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginLeft: -5, height: 40 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="labeled"
          active={props.activeTab === "labeled"}
          onClick={props.changeTab}
        >
          {t("settings.labeled")}{" "}
          <Loader size="mini" inline active={props.fetchingLabeledFacesList} />
        </Menu.Item>
        <Menu.Item
          name="inferred"
          active={props.activeTab === "inferred"}
          onClick={props.changeTab}
        >
          {t("settings.inferred")}{" "}
          <Loader size="mini" inline active={props.fetchingInferredFacesList} />
        </Menu.Item>
      </Menu>
    </div>
  );
};