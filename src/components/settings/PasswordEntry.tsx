import { ActionIcon, Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Lock, LockOpen } from "tabler-icons-react";

type Props = {
  createNew?: boolean;
  onValidate: (string, boolean) => void;
  closing?: boolean;
};
export function PasswordEntry(props: Props): JSX.Element {
  const { closing, createNew, onValidate } = props;

  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    validateAndUpdatePassword(newPassword, newPasswordConfirm, closing);
  }, [createNew, closing, editPasswordMode]);

  const validateAndUpdatePassword = (password, passwordConfirm, closing = false) => {
    setConfirmPasswordError("");
    setNewPasswordError("");
    var validPassword = "";
    var isValid = false;

    if (password || passwordConfirm) {
      if (password == passwordConfirm) {
        validPassword = password;
        isValid = true;
      } else if (passwordConfirm !== "") {
        setConfirmPasswordError(t("settings.password.errormustmatch"));
      } else if (closing) {
        setConfirmPasswordError(t("settings.password.errormustretype"));
      }
    } else if (editPasswordMode || createNew) {
      setNewPasswordError(t("settings.password.errorcannotbeblank"));
    } else {
      isValid = true;
    }

    onValidate(validPassword, isValid);
  };

  return (
    <Stack style={{ display: "flex", alignContent: "stretch" }} spacing="xs">
      <Title order={6} style={{ paddingTop: "15px" }}>
        {createNew ? (
          <Text>{t("settings.password.titlesetpassword")}</Text>
        ) : (
          <Text style={{ display: "flex", alignItems: "center" }}>
            {t("settings.password.titlechangepassword")}
            <ActionIcon
              title={t("settings.password.tooltipeditbutton")}
              color="blue"
              variant={editPasswordMode ? "outline" : "filled"}
              component="span"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                setEditPasswordMode(!editPasswordMode);
              }}
            >
              {editPasswordMode ? <LockOpen size={16} /> : <Lock size={16} />}
            </ActionIcon>
          </Text>
        )}
      </Title>

      <PasswordInput
        icon={<Lock />}
        placeholder={t("login.passwordplaceholder")}
        name="password"
        disabled={!editPasswordMode && !createNew}
        required={editPasswordMode}
        value={newPassword}
        error={newPasswordError}
        onChange={event => {
          setNewPassword(event.currentTarget.value);
          validateAndUpdatePassword(event.currentTarget.value, newPasswordConfirm);
        }}
      />
      <PasswordInput
        icon={<Lock />}
        placeholder={t("login.confirmpasswordplaceholder")}
        name="passwordConfirm"
        disabled={!editPasswordMode && !createNew}
        required={editPasswordMode}
        value={newPasswordConfirm}
        error={confirmPasswordError}
        onChange={event => {
          setNewPasswordConfirm(event.currentTarget.value);
          validateAndUpdatePassword(newPassword, event.currentTarget.value);
        }}
      />
    </Stack>
  );
}
