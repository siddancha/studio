import { Box, Stack } from "@mui/material";

import { Color, LightCurtainMesh } from "@foxglove/studio-base/types/Messages";
import ColorPicker from "@foxglove/studio-base/components/ColorPicker";
import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";
import { DEFAULT_COLOR } from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/LightCurtainMesh";

import { TopicSettingsEditorProps } from ".";
import { SLabel } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/styling";

export type LightCurtainMeshSettings = {
  color?: Color;
};

export default function LightCurtainMeshSettingsEditor(
  props: TopicSettingsEditorProps<LightCurtainMesh, LightCurtainMeshSettings>,
): JSX.Element {
  const { message, settings, onFieldChange } = props;

  if (!message) {
    return (
      <Box color={colors.TEXT_MUTED}>
        <small>Waiting for messages...</small>
      </Box>
    );
  }

  return (
    <Stack flex="auto">
      <SLabel>Color</SLabel>
      <ColorPicker
        color={settings.color ?? DEFAULT_COLOR}
        onChange={(newColor) => onFieldChange("color", newColor)}
        alphaType="alpha"
      />
    </Stack>
  );
}
