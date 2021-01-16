import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, number, array } from "@storybook/addon-knobs";

import BarGraph from "./barGraph";

const components = storiesOf('Components', module);
components
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add('BarGraph', () => (
    <BarGraph labels={array('labels', ["test", "test2", "test3", "test4", "test5"])} data={[number('data1', 12), 14, 15, 16, 17]} title={text("title", "test")}
    />
  ));
