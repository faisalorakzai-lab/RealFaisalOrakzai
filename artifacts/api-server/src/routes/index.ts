import { Router, type IRouter } from "express";
  import healthRouter from "./health";
  import dashboardRouter from "./dashboard";
  import projectsRouter from "./projects";
  import articlesRouter from "./articles";
  import researchRouter from "./research";
  import newsRouter from "./news";
  import companiesRouter from "./companies";
  import mediaRouter from "./media";
  import timelineRouter from "./timeline";
  import contactRouter from "./contact";
  import aiRouter from "./ai";
  import searchRouter from "./search";
  import papersRouter from "./papers";

  const router: IRouter = Router();

  router.use(healthRouter);
  router.use(dashboardRouter);
  router.use(projectsRouter);
  router.use(articlesRouter);
  router.use(researchRouter);
  router.use(papersRouter);
  router.use(newsRouter);
  router.use(companiesRouter);
  router.use(mediaRouter);
  router.use(timelineRouter);
  router.use(contactRouter);
  router.use(aiRouter);
  router.use(searchRouter);

  export default router;
  