"use client";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import UsersTable from "../components/dashboard/admin/UsersTable";
import { User } from "../api/entities/user.entity";
import {
  fetchEventList,
  fetchMemberList,
  fetchPubList,
  fetchQuestionList,
  fetchTestimonyList,
  fetchUserList,
} from "../utils/fetchFunctions";
import { FetchState } from "../types/types";
import { Member } from "../api/entities/member.entity";
import MembersTable from "../components/dashboard/admin/MembersTable";
import { Event } from "../api/entities/event.entity";
import EventsTable from "../components/dashboard/admin/EventsTable";
import { Question } from "../api/entities/question.entity";
import { Item } from "../api/entities/item.entity";
import { Testimony } from "../api/entities/testimony.entity";
import QuestionsTable from "../components/dashboard/admin/QuestionsTable";
import PubsTable from "../components/dashboard/admin/PubsTable";
import TestimonyTable from "../components/dashboard/admin/TestimonyTable";
import UploadWidget from "../components/UploadWidget";

const initialState = {
  refetch: true,
  value: [],
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<FetchState<User[]>>(initialState);
  const [members, setMembers] = useState<FetchState<Member[]>>(initialState);
  const [events, setEvents] = useState<FetchState<Event[]>>(initialState);
  const [questions, setQuestions] =
    useState<FetchState<Question[]>>(initialState);
  const [pubs, setPubs] = useState<FetchState<Item[]>>(initialState);
  const [testimonies, setTestimonies] =
    useState<FetchState<Testimony[]>>(initialState);
  const [eventsLoading, isEventsLoading] = useState<boolean>(false);
  const [usersLoading, isUsersLoading] = useState<boolean>(false);
  const [membersLoading, isMembersLoading] = useState<boolean>(false);
  const [questionsLoading, isQuestionsLoading] = useState<boolean>(false);
  const [pubsLoading, isPubsLoading] = useState<boolean>(false);
  const [testimoniesLoading, isTestimoniesLoading] = useState<boolean>(false);

  const usersRefetch = useMemo(() => users.refetch, [users.refetch]);
  const membersRefetch = useMemo(() => members.refetch, [members.refetch]);
  const eventsRefetch = useMemo(() => events.refetch, [events.refetch]);
  const questionsRefetch = useMemo(
    () => questions.refetch,
    [questions.refetch],
  );
  const pubsRefetch = useMemo(() => pubs.refetch, [pubs.refetch]);
  const testimonyRefetch = useMemo(
    () => testimonies.refetch,
    [testimonies.refetch],
  );

  useEffect(() => {
    if (usersRefetch) {
      fetchUserList(setUsers, isUsersLoading);
    }
  }, [usersRefetch]);
  useEffect(() => {
    if (membersRefetch) {
      fetchMemberList(setMembers, isMembersLoading);
    }
  }, [membersRefetch]);
  useEffect(() => {
    if (testimonyRefetch) {
      fetchTestimonyList(setTestimonies, isTestimoniesLoading);
    }
  }, [testimonyRefetch]);
  useEffect(() => {
    if (eventsRefetch) {
      fetchEventList(setEvents, isEventsLoading);
    }
  }, [eventsRefetch]);
  useEffect(() => {
    if (questionsRefetch) {
      fetchQuestionList(setQuestions, isQuestionsLoading);
    }
  }, [questionsRefetch]);
  useEffect(() => {
    if (pubsRefetch) {
      fetchPubList(setPubs, isPubsLoading);
    }
  }, [pubsRefetch]);

  return (
    <div className="min-h-screen pt-navbar lg:pt-navbard px-10 pb-5 flex w-full h-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3 lg:hidden self-center text-center text-black h-full items-center justify-center">
          <p className="font-raleway text-2xl">
            El panel de administracion no esta disponible en este tamaño de
            pantalla.
          </p>
          <p className="italic font-raleway text-xl text-center opacity-60">
            Por favor cambia el dispositivo para poder administrar la pagina
          </p>
        </div>
        <Card className="hidden lg:block h-full dark " fullWidth radius="sm">
          <CardBody className="h-full">
            <div className="flex flex-col gap-3">
              <h3 className="font-comorant text-2xl font-bold pt-5 pl-5">
                Navegación
              </h3>
              <Tabs variant="light" className="font-raleway w-full dark">
                <Tab key="users" title="Usuarios">
                  <Divider />
                  <UsersTable
                    users={users.value}
                    isLoading={usersLoading}
                    forceRefetch={setUsers}
                  />
                </Tab>
                <Tab key="members" title="Miembros">
                  <Divider />
                  <MembersTable
                    isLoading={membersLoading}
                    forceRefetch={setMembers}
                    state={members}
                  />
                </Tab>
                <Tab key="events" title="Eventos">
                  <Divider />
                  <EventsTable
                    isLoading={eventsLoading}
                    state={events}
                    forceRefetch={setEvents}
                  />
                </Tab>
                <Tab key="questions" title="Preguntas">
                  <Divider />
                  <QuestionsTable
                    forceRefetch={setQuestions}
                    isLoading={questionsLoading}
                    questions={questions.value}
                  />
                </Tab>
                <Tab key="pubs" title="Publicaciones">
                  <Divider />
                  <PubsTable
                    isLoading={pubsLoading}
                    state={pubs}
                    forceRefetch={setPubs}
                  />
                </Tab>
                <Tab key="testimony" title="Testimonios">
                  <Divider />
                  <TestimonyTable
                    isLoading={testimoniesLoading}
                    testimonies={testimonies.value}
                    forceRefetch={setTestimonies}
                  />
                </Tab>
              </Tabs>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
