"use client";

import React, { useEffect, useRef } from "react";
import { Pie, G2, measureTextWidth } from "@antv/g2plot";

const G = G2.getEngine("canvas");

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
        appendPadding: 20,
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
          layout: "horizontal",
          position: "top",
          offsetX: 0,
          offsetY: -8,
          itemSpacing: 7,
          itemName: {
            style: {
              fontSize: 17,
              height: 77,
            },
          },
        },
        label: {
          type: "spider",
          labelHeight: 31,
          formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
              type: "circle",
              attrs: {
                x: 0,
                y: 0,
                width: 31,
                height: 31,
                r: 4,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: "text",
              attrs: {
                x: 8,
                y: 7,
                text: `${data.type}`,
                fill: mappingData.color,
                fontSize: 13,
              },
            });
            group.addShape({
              type: "text",
              attrs: {
                x: 0,
                y: 22,
                text: `${data.value} = ${data.percent * 100}%`,
                fill: "rgba(0, 0, 0, 0.65)",
                fontWeight: 700,
                fontSize: 14,
              },
            });
            return group;
          },
        },
        statistic: {
          title: {
            offsetY: -8,

            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect();

              const d = Math.sqrt(
                Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
              );

              const text = datum ? datum.type : "Total";

              return renderStatistic(d, text, {
                fontSize: 12,
                textAlign: "center",
              });
            },
          },
          content: {
            offsetY: -4,

            style: {
              fontSize: "22px",
              textAlign: "center",
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
