// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { TopicDropdown } from "./TopicDropdown";

export default {
  title: "panels/ImageView/TopicDropdown",
  component: TopicDropdown,
};

export const NoTopics: Story = (_args) => {
  return <TopicDropdown multiple={false} title="Title" items={[]} onChange={action("onChange")} />;
};

export const OneTopic: Story = (_args) => {
  return (
    <TopicDropdown
      multiple={false}
      title="Title"
      items={[{ name: "/foobar", selected: false }]}
      onChange={action("onChange")}
    />
  );
};

export const MultipleTopic: Story = (_args) => {
  return (
    <TopicDropdown
      multiple={true}
      title="Title"
      items={[
        { name: "/foobar", selected: false },
        { name: "/another", selected: true },
        { name: "/final", selected: false },
      ]}
      onChange={action("onChange")}
    />
  );
};
