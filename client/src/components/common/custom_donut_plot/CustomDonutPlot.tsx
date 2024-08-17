"use client";

import React, { useEffect, useRef } from "react";
import { Pie, measureTextWidth } from "@antv/g2plot";

const CustomDonutPlot: React.FC<{
  dataCustomDonutPlot: DataCustomDonutPlot[];
}> = ({ dataCustomDonutPlot }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const renderStatistic = (
    containerWidth: number,
    text: string,
    style: any
  ) => {
    const textWidth = measureTextWidth(text, style);

    const textHeight = style.lineHeight || style.fontSize;

    const R = containerWidth / 2;

    let scale = 1.3;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;

    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      const piePlot = new Pie(chartContainerRef.current, {
        appendPadding: 13,
        data: dataCustomDonutPlot,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.54,
        meta: {
          value: {
            formatter: (v) => `${v}`,
          },
        },
        legend: {
          layout: "vertical",
          position: "right",
          offsetX: -88,
          offsetY: 0,
          itemMarginBottom: 17,
        },
        label: {
          type: "inner",
          offset: "-54%",
          content: "{value}",
          autoRotate: false,
          style: {
            fontSize: 27,
            textAlign: "center",
          },
        },
        statistic: {
          title: {
            offsetY: -13,

            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect();

              const d = Math.sqrt(
                Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
              );

              const text = datum ? datum.type : "Total";

              return renderStatistic(d, text, {
                fontSize: 16,
                textAlign: "center",
              });
            },
          },
          content: {
            offsetY: -7,

            style: {
              textAlign: "center",
              fontSize: "31px",
            },

            customHtml: (container, view, datum, data: any) => {
              const { width } = container.getBoundingClientRect();

              const text = datum
                ? `${datum.value}`
                : `${data.reduce((r: any, d: any) => r + d.value, 0)}`;

              return renderStatistic(width, text, { fontSize: 31 });
            },
          },
        },
        interactions: [
          { type: "element-selected" },
          { type: "element-active" },
          { type: "pie-statistic-active" },
          { type: "pie-legend-active" },
        ],
      });

      piePlot.render();

      return () => {
        piePlot.destroy();
      };
    }
  }, [dataCustomDonutPlot]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default React.memo(CustomDonutPlot);
