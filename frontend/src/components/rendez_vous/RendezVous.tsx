
import { Badge, Dropdown, Progress } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getRendezVous, RDV } from "../../api";


const RendezVous = () => {

  const [rdvs, setRendezVous] = useState<RDV[]>([]);

  useEffect(() => {
    getRendezVous().then(data => setRendezVous(data));
  }, []);

  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];
  const formatDateTimeLong = (dateString: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateString));
  };


  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-full break-words">
        <h5 className="card-title">Liste des rendez-vous</h5>
        <div className="mt-3">

          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">ID</Table.HeadCell>
                <Table.HeadCell>Patient</Table.HeadCell>
                <Table.HeadCell>Médecin</Table.HeadCell>
                <Table.HeadCell>Date et heure</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {rdvs.map((rdv, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{rdv.id}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{rdv.patient_nom} {rdv.patient_prenom}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{rdv.medecin_nom} {rdv.medecin_prenom}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{formatDateTimeLong(rdv.date_heure)}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{rdv.status}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <HiOutlineDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {tableActionData.map((items, index) => (
                          <Dropdown.Item key={index} className="flex gap-3">
                            {" "}
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

        </div>
      </div>
    </>
  );
};

export { RendezVous };