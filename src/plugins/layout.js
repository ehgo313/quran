import { layouts } from '../components/layouts';

export function useLayout(app) {
  for (const layout in layouts) {
    app.component(layout, layouts[layout]);
  }
}
