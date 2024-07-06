import { layouts } from 'src/components/layouts';

export function useLayout(app) {
  for (const layout in layouts) {
    app.component(layout, layouts[layout]);
  }
}
