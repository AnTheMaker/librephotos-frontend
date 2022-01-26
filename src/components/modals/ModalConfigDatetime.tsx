import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";
import Modal from "react-modal";
import { SortableItem } from "../settings/SortableItem";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchDefaultRules } from "../../actions/userActions";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  addItemFunction: (item: any) => void;
};

export const ModalConfigDatetime = (props: Props) => {
  const defaultRules: any = useAppSelector((state) => state.user.defaultRules);
  const dispatch = useAppDispatch();
  //To-Do: use translation
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>();

  useEffect(() => {
    if (!defaultRules) {
      fetchDefaultRules(dispatch);
    }
  }, []); // Only run on first render

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      onRequestClose={() => {
        props.onRequestClose();
      }}
      style={{
        content: {
          top: "12vh",
          left: "8vh",
          right: "8vh",
          height: "65vh",
          display: "flex",
          flexFlow: "column",
          overflow: "hidden",
          padding: 0,
          backgroundColor: "white",
        },
        overlay: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed",
          borderRadius: 0,
          border: 0,
          zIndex: 102,
          backgroundColor: "rgba(200,200,200,0.8)",
        },
      }}
    >
      <div style={{ padding: 10 }}>
        <Header>
          <Header.Content>
            Choose a new rule to add
            <Header.Subheader>
              Choose a rule, that will parse the date from a certain field or
              attribute.
            </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
      <div style={{ padding: 10 }}>
        <Header as="h5">Rules:</Header>
      </div>
      <div style={{ padding: 10, overflowY: "auto", height: "100%" }}>
        {defaultRules &&
          defaultRules.map((rule: any) => (
            <SortableItem
              key={rule.id}
              id={rule.id}
              item={rule}
              addItem={true}
              addItemFunction={props.addItemFunction}
            ></SortableItem>
          ))}
      </div>
    </Modal>
  );
};

//To-Do: Complains that position is a string and not a position, but I can't import the position interface. Copy and pasting fixed it
const modalStyles = {
  content: {
    top: "12vh",
    left: "8vh",
    right: "8vh",
    height: "65vh",
    display: "flex",
    flexFlow: "column",
    overflow: "hidden",
    padding: 0,
    backgroundColor: "white",
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    borderRadius: 0,
    border: 0,
    zIndex: 102,
    backgroundColor: "rgba(200,200,200,0.8)",
  },
};