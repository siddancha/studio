import { Box, Stack } from "@mui/material";

import { LightCurtainMesh } from "@foxglove/studio-base/types/Messages";
import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";

import { TopicSettingsEditorProps } from ".";
import { SLabel, SInput } from "./common";

export type LightCurtainMeshSettings = {
  alpha?: number;
};

export default function LightCurtainMeshSettingsEditor(
  props: TopicSettingsEditorProps<LightCurtainMesh, LightCurtainMeshSettings>,
): JSX.Element {
  const { message, settings, onSettingsChange } = props;

  if (!message) {
    return (
      <Box color={colors.TEXT_MUTED}>
        <small>Waiting for messages...</small>
      </Box>
    );
  }

  const currentAlpha = settings.alpha ?? 0.5;

  return (
    <Stack flex="auto">
      <SLabel>Alpha</SLabel>
      <SInput
        type="number"
        value={currentAlpha}
        placeholder="0.5"
        onChange={(e) =>
          onSettingsChange({
            ...settings,
            alpha: parseFloat(e.target.value),
          })
        }
      />
    </Stack>
  );
}
