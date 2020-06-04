import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/audit',
  //   component: Layout,
  //   redirect: '/audit/plan',
  //   name: 'Audit',
  //   meta: {
  //     title: 'audit',
  //     icon: 'component'
  //   },
  //   children: [
  //     {
  //       path: 'plan',
  //       component: () => import('@/views/audit/audit-plan'),
  //       name: 'AuditPlan',
  //       meta: { title: 'auditPlan' }
  //     },
  //     {
  //       path: 'task',
  //       component: () => import('@/views/audit/audit-task'),
  //       name: 'AuditTask',
  //       meta: { title: 'auditTask' }
  //     },
  //     {
  //       path: 'conclusion',
  //       component: () => import('@/views/audit/audit-conclusion'),
  //       name: 'AuditConclusion',
  //       hidden: true,
  //       meta: { title: 'auditConclusion' }
  //     }
  //   ]
  // },
  {
    path: '/notice',
    component: Layout,
    meta: { title: 'notice', icon: 'notice' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'agencyMatters',
        component: () => import('@/views/notice/agencyMatters/index'),
        name: 'agencyMatters',
        meta: { title: 'agencyMatters' }
      },
      {
        path: 'workDone',
        component: () => import('@/views/notice/workDone/index'),
        name: 'workDone',
        meta: { title: 'workDone' }
      },
    ]
  },
  {
    path: '/standard',
    component: Layout,
    meta: { title: 'standard', icon: 'standard' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'infoCategory',
        component: () => import('@/views/standard/infoCategory/index'),
        meta: { title: 'infoCategory', icon: 'skill' },
        redirect: 'noRedirect',
        children: [
          {
            path: 'dataSources',
            component: () => import('@/views/standard/infoCategory/dataSources/index'),
            name: 'dataSources',
            meta: { title: 'dataSources' }
          },
          {
            path: 'responsibleUnit',
            component: () => import('@/views/standard/infoCategory/responsibleUnit/index'),
            name: 'responsibleUnit',
            meta: { title: 'responsibleUnit' }
          },
          {
            path: 'productSystem',
            component: () => import('@/views/standard/infoCategory/productSystem/index'),
            name: 'productSystem',
            meta: { title: 'productSystem' }
          },
          {
            path: 'hazardClassification',
            component: () => import('@/views/standard/infoCategory/hazardClassification/index'),
            name: 'hazardClassification',
            meta: { title: 'hazardClassification' }
          },
          {
            path: 'riskList',
            component: () => import('@/views/standard/infoCategory/riskList/index'),
            name: 'riskList',
            meta: { title: 'riskList' }
          },
          {
            path: 'incentiveList',
            component: () => import('@/views/standard/infoCategory/incentiveList/index'),
            name: 'incentiveList',
            meta: { title: 'incentiveList' }
          }
        ]
      },
      {
        path: '/riskManagement',
        component: () => import('@/views/standard/riskManagement/index'),
        meta: { title: 'riskManagement', icon: 'clipboard' },
        redirect: 'noRedirect',
        children: [
          {
            path: 'companyPossibility',
            component: () => import('@/views/standard/riskManagement/companyPossibility/index'),
            name: 'companyPossibility',
            meta: { title: 'companyPossibility' }
          },
          {
            path: 'companySeriousness',
            component: () => import('@/views/standard/riskManagement/companySeriousness/index'),
            name: 'companySeriousness',
            meta: { title: 'companySeriousness' }
          },
          {
            path: 'companyRisk',
            component: () => import('@/views/standard/riskManagement/companyRisk/index'),
            name: 'companyRisk',
            meta: { title: 'companyRisk' }
          },
          {
            path: 'unitPossibility',
            component: () => import('@/views/standard/riskManagement/unitPossibility/index'),
            name: 'unitPossibility',
            meta: { title: 'unitPossibility' }
          },
          {
            path: 'unitSeriousness',
            component: () => import('@/views/standard/riskManagement/unitSeriousness/index'),
            name: 'unitSeriousness',
            meta: { title: 'unitSeriousness' }
          },
          {
            path: 'unitRisk',
            component: () => import('@/views/standard/riskManagement/unitRisk/index'),
            name: 'unitRisk',
            meta: { title: 'unitRisk' }
          }
        ]
      },
    ]
  },
  {
    path: '/infoDatabase',
    component: Layout,
    meta: { title: 'infoDatabase', icon: 'tree' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'supervision',
        component: () => import('@/views/infoDatabase/supervision/index'),
        name: 'supervision',
        meta: { title: 'supervision' }
      },
      {
        path: 'safeSelfExamination',
        component: () => import('@/views/infoDatabase/safeSelfExamination/index'),
        name: 'safeSelfExamination',
        meta: { title: 'safeSelfExamination' }
      },
      {
        path: 'qualityAudit',
        component: () => import('@/views/infoDatabase/qualityAudit/index'),
        name: 'qualityAudit',
        meta: { title: 'qualityAudit' }
      },
      {
        path: 'externalInspection',
        component: () => import('@/views/infoDatabase/externalInspection/index'),
        name: 'externalInspection',
        meta: { title: 'externalInspection' }
      },
      {
        path: 'incidentInvestigation',
        component: () => import('@/views/infoDatabase/incidentInvestigation/index'),
        name: 'incidentInvestigation',
        meta: { title: 'incidentInvestigation' }
      },
      {
        path: 'voluntaryReport',
        component: () => import('@/views/infoDatabase/voluntaryReport/index'),
        name: 'voluntaryReport',
        meta: { title: 'voluntaryReport' }
      },
      {
        path: 'mandatoryReport',
        component: () => import('@/views/infoDatabase/mandatoryReport/index'),
        name: 'mandatoryReport',
        meta: { title: 'mandatoryReport' }
      },
    ]
  },
  {
    path: '/dangerManagerment',
    component: Layout,
    meta: { title: 'dangerManagerment', icon: 'riskManagerment' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'modelDesign',
        component: () => import('@/views/dangerManagerment/modelDesign/index'),
        name: 'modelDesign',
        meta: { title: 'modelDesign' }
      },
      {
        path: 'riskAssessmentDataExport',
        component: () => import('@/views/dangerManagerment/riskAssessmentDataExport/index'),
        name: 'riskAssessmentDataExport',
        meta: { title: 'riskAssessmentDataExport' }
      },
      {
        path: 'safetyRiskPrompt',
        component: () => import('@/views/dangerManagerment/safetyRiskPrompt/index'),
        name: 'safetyRiskPrompt',
        meta: { title: 'safetyRiskPrompt' }
      },
      {
        path: 'riskAssessmentProcess',
        component: () => import('@/views/dangerManagerment/riskAssessmentProcess/index'),
        name: 'riskAssessmentProcess',
        meta: { title: 'riskAssessmentProcess' }
      },
    ]
  },
  {
    path: '/dangerEvaluate',
    component: Layout,
    meta: { title: 'dangerEvaluate', icon: 'risk-valuate' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'riskListManager',
        component: () => import('@/views/dangerEvaluate/riskListManager/index'),
        meta: { title: 'riskListManager', icon: 'risk-list' },
        redirect: 'noRedirect',
        children: [
          {
            path: 'riskListDown',
            component: () => import('@/views/dangerEvaluate/riskListManager/riskListDown/index'),
            name: 'riskListDown',
            meta: { title: 'riskListDown' }
          },
          {
            path: 'riskListAccept',
            component: () => import('@/views/dangerEvaluate/riskListManager/riskListAccept/index'),
            name: 'riskListAccept',
            meta: { title: 'riskListAccept' }
          },
          {
            path: 'riskListSearch',
            component: () => import('@/views/dangerEvaluate/riskListManager/riskListSearch/index'),
            name: 'riskListSearch',
            meta: { title: 'riskListSearch' }
          },
        ]
      },
      {
        path: 'riskMeasureReport',
        component: () => import('@/views/dangerEvaluate/riskMeasureReport/index'),
        meta: { title: 'riskMeasureReport', icon: 'risk-measure' },
        redirect: 'noRedirect',
        children: [
          {
            path: 'riskMeasureInput',
            component: () => import('@/views/dangerEvaluate/riskMeasureReport/riskMeasureInput/index'),
            name: 'riskMeasureInput',
            meta: { title: 'riskMeasureInput' }
          },
          {
            path: 'riskMeasureConfirm',
            component: () => import('@/views/dangerEvaluate/riskMeasureReport/riskMeasureConfirm/index'),
            name: 'riskMeasureConfirm',
            meta: { title: 'riskMeasureConfirm' }
          },
          {
            path: 'riskMeasureSearch',
            component: () => import('@/views/dangerEvaluate/riskMeasureReport/riskMeasureSearch/index'),
            name: 'riskMeasureSearch',
            meta: { title: 'riskMeasureSearch' }
          },
        ]
      },
      {
        path: 'implementationResultsReport',
        component: () => import('@/views/dangerEvaluate/implementationResultsReport/index'),
        meta: { title: 'implementationResultsReport', icon: 'skill' },
        redirect: 'noRedirect',
        children: [
          {
            path: 'riskImplementationInput',
            component: () => import('@/views/dangerEvaluate/implementationResultsReport/riskImplementationInput/index'),
            name: 'riskImplementationInput',
            meta: { title: 'riskImplementationInput' }
          },
          {
            path: 'riskImplementationConfirm',
            component: () => import('@/views/dangerEvaluate/implementationResultsReport/riskImplementationConfirm/index'),
            name: 'riskImplementationConfirm',
            meta: { title: 'riskImplementationConfirm' }
          },
          {
            path: 'riskImplementationSearch',
            component: () => import('@/views/dangerEvaluate/implementationResultsReport/riskImplementationSearch/index'),
            name: 'riskImplementationSearch',
            meta: { title: 'riskImplementationSearch' }
          },
        ]
      },
    ]
  },
  {
    path: '/hiddenDangerInvestigation',
    component: Layout,
    meta: { title: 'hiddenDangerInvestigation', icon: 'bug' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'safetyHazardControlList',
        component: () => import('@/views/hiddenDangerInvestigation/safetyHazardControlList/index'),
        name: 'safetyHazardControlList',
        meta: { title: 'safetyHazardControlList' }
      },
      {
        path: 'safetyHazardsStatistics',
        component: () => import('@/views/hiddenDangerInvestigation/safetyHazardsStatistics/index'),
        name: 'safetyHazardsStatistics',
        meta: { title: 'safetyHazardsStatistics' }
      },
      {
        path: 'safetyHazardsFollow',
        component: () => import('@/views/hiddenDangerInvestigation/safetyHazardsFollow/index'),
        name: 'safetyHazardsFollow',
        meta: { title: 'safetyHazardsFollow' }
      },
    ]
  },
  {
    path: '/qualityEvaluation',
    component: Layout,
    meta: { title: 'qualityEvaluation', icon: 'star' },
    redirect: 'noRedirect',
    children: [
      {
        path: 'qualityEvaluate',
        component: () => import('@/views/qualityEvaluation/qualityEvaluate/index'),
        name: 'qualityEvaluate',
        meta: { title: 'qualityEvaluate' }
      },
      {
        path: 'customerComplaints',
        component: () => import('@/views/qualityEvaluation/customerComplaints/index'),
        name: 'customerComplaints',
        meta: { title: 'customerComplaints' }
      }
    ]
  },
  /* {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'SystemManage',
    meta: {
      title: 'systemManage',
      icon: 'component'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/Employee/index.vue'),
        name: 'UserManage',
        meta: { title: 'userManage' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'RolesManage',
        meta: { title: 'rolesManage' }
      },
      {
        path: 'auth',
        component: () => import('@/views/system/auth/index.vue'),
        name: 'AuthorityManage',
        meta: { title: 'authorityManage' }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index.vue'),
        name: 'DataDictionary',
        meta: { title: 'dataDictionary' }
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
