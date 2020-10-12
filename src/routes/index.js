import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import CreateUser from '../components/CreateUser.vue'
import Application from '../components/Application.vue'
import BadCounty from '../components/BadCounty.vue'
import ContactInfo from '../components/ContactInfo.vue'
import AddressInfo from '../components/AddressInfo.vue'
import HouseholdType from '../components/HouseholdType.vue'
import HouseholdInfo from '../components/HouseholdInfo.vue'
import AddMember from '../components/AddMember.vue'
import DwellingHeat from '../components/DwellingHeat.vue'
import Dhi from '../components/Dhi.vue'
import AddDhiMember from '../components/AddDhiMember'
import MoreInfo1 from '../components/MoreInfo1'
import RequiredDocs from '../components/RequiredDocs'
import RequiredDocs2 from '../components/RequiredDocs2'
import RequiredDocs3 from '../components/RequiredDocs3'
import SignAndSubmit from '../components/SignAndSubmit'
import CheckApplications from '../components/CheckApplications'
import SingleApplicant from '../components/SingleApplicant'
import ForgotPassword from '../components/ForgotPassword'
import EmailSent from '../components/EmailSent'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/createuser',
        name: 'CreateUser',
        component: CreateUser
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/emailsent',
        name: 'EmailSent',
        component: EmailSent
    },
    {
        path: '/application/:uid',
        name: 'Application',
        component: Application
    },
    {
        path: '/application/:uid/bad_county',
        name: 'BadCounty',
        component: BadCounty
    },
    {
        path: '/application/:uid/contact_info',
        name: 'ContactInfo',
        component: ContactInfo
    },
    {
        path: '/application/:uid/address_info',
        name: 'AddressInfo',
        component: AddressInfo
    },
    {
        path: '/application/:uid/household_type',
        name: 'HouseholdType',
        component: HouseholdType
    },
    {
        path: '/application/:uid/household_info',
        name: 'HouseholdInfo',
        component: HouseholdInfo
    },
    {
        path: '/application/:uid/household_info/add_member',
        name: 'AddMember',
        component: AddMember,
        props: true
    },
    {
        path: '/application/:uid/dwelling_heat',
        name: 'DwellingHeat',
        component: DwellingHeat
    },
    {
        path: '/application/:uid/dhi',
        name: 'Dhi',
        component: Dhi
    },
    {
        path: '/application/:uid/dhi/add_dhi_member',
        name: 'AddDhiMember',
        component: AddDhiMember,
        props: true
    },
    {
        path: '/application/:uid/more_info_1',
        name: 'MoreInfo1',
        component: MoreInfo1
    },
    {
        path: '/application/:uid/required_docs',
        name: 'RequiredDocs',
        component: RequiredDocs
    },
    {
        path: '/application/:uid/required_docs_2',
        name: 'RequiredDocs2',
        component: RequiredDocs2
    },
    {
        path: '/application/:uid/required_docs_3',
        name: 'RequiredDocs3',
        component: RequiredDocs3
    },
    {
        path: '/application/:uid/sign_submit',
        name: 'SignAndSubmit',
        component: SignAndSubmit
    },
    {
        path: '/check_apps',
        name: 'CheckApplications',
        component: CheckApplications
    },
    {
        path: '/single_app',
        name: 'SingleApplicant',
        component: SingleApplicant,
        props: true
    },
]
});

export default router