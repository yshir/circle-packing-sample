import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WIDTH = 800;
const HEIGHT = 600;

type Node = {
  name: string;
  value: number;
  children?: Node[];
};

const data = {
  name: 'A',
  children: [
    { name: 'B', value: 25 },
    {
      name: 'C',
      children: [
        { name: 'D', value: 10 },
        { name: 'E', value: 15 },
        { name: 'F', value: 10 },
      ],
    },
    { name: 'G', value: 15 },
    {
      name: 'H',
      children: [
        { name: 'I', value: 20 },
        { name: 'J', value: 10 },
        {
          name: 'K',
          children: [
            { name: 'L', value: 5 },
            { name: 'M', value: 15 },
          ],
        },
      ],
    },
  ],
};

export function App() {
  const ref = useRef(null);

  useEffect(() => {
    const root = d3.pack<Node>().size([WIDTH, HEIGHT]).padding(0)(
      d3
        .hierarchy<Node>(data as Node) // value filled after calling sum()
        .sum((d) => d.value)
    );

    const node = d3
      .select(ref.current)
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    const color = ['orange', 'Khaki', 'Ivory'];
    node
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('stroke', 'black')
      .attr('fill', (d) => color[d.depth % color.length]);

    node
      .append('text')
      .style('text-anchor', (d) => (d.children ? 'end' : 'middle'))
      .attr('font-size', '150%')
      .text((d) => (d.children ? '' : d.data.name));
  }, []);

  return (
    <div>
      <svg width={WIDTH} height={HEIGHT} ref={ref} />
    </div>
  );
}
