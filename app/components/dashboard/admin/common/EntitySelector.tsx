"use client";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ServerResponse } from "@/app/types/responses";
import { Member } from "@/app/api/entities/member.entity";
import { User } from "@/app/api/entities/user.entity";
import { Participant } from "@/app/api/entities/participant.entity";

type Props = {
  type: "member" | "participants" | "user";
  label?: string;
  initials: string[];
  description?: string;
  valueSetter: React.Dispatch<React.SetStateAction<string[]>>;
  placeHolder: string;
};

const defineText = (
  entity: Member | User | Participant,
  type: "member" | "participants" | "user",
): string => {
  switch (type) {
    case "member":
    case "user":
      return (entity as Member | User).email;
    case "participants":
      return (entity as Participant).displayName;
  }
};

const getEntityId = (entity: Member | User | Participant): string => {
  if (entity instanceof Member) {
    return entity.memberId;
  } else if (entity instanceof User) {
    return entity.userId;
  } else {
    return entity.participantId;
  }
};

export default function EntitySelector({
  description,
  placeHolder,
  type,
  initials,
  valueSetter,
  label,
}: Props) {
  const [entityList, setEntityList] = useState<(Member | User | Participant)[]>(
    [],
  );
  const [values, setValues] = useState<Set<string>>(new Set(initials));
  const [loading, isLoading] = useState<boolean>(false);

  useEffect(() => {
    setValues(new Set(initials));
  }, [initials]);

  useEffect(() => {
    const fetchValue = async () => {
      isLoading(true);
      try {
        const { data } = await axios.get<
          ServerResponse<(Member | User | Participant)[]>
        >(`${process.env.NEXT_PUBLIC_BE_URL}/${type}`);
        setEntityList(data.message);
      } catch (e: any) {
        console.log("ERROR: ", e);
      } finally {
        isLoading(false);
      }
    };
    fetchValue();
  }, []);
  return (
    <Select
      isLoading={loading}
      isDisabled={loading}
      selectionMode="multiple"
      selectedKeys={values}
      className="dark"
      classNames={{
        popoverContent: "dark",
      }}
      onClose={() => {
        valueSetter(Array.from(values));
      }}
      items={entityList}
      label={label}
      placeholder={placeHolder}
      onSelectionChange={setValues as any}
      description={description}
    >
      {(entity) => (
        <SelectItem
          key={getEntityId(entity)}
          textValue={defineText(entity, type)}
          className="text-white"
        >
          <div className="flex gap-2 items-center">
            <Avatar alt={entity.avatarUrl} size="sm" src={entity.avatarUrl} />
            <span className="text-small font-raleway">
              {defineText(entity, type)}
            </span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
