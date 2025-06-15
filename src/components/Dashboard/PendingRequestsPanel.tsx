
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PendingRequest = {
  id: string;
  name: string;
  email: string;
  company?: string;
  category: "supplier" | "vendor" | "retailer" | "wholesaler" | "production" | "hr";
  status: "pending" | "blocked" | "approved" | "disapproved";
};

const mockRequests: PendingRequest[] = [
  {
    id: "1",
    name: "Richard Roe",
    email: "rich.supplier@test.com",
    company: "Parts Inc.",
    category: "supplier",
    status: "pending",
  },
  {
    id: "2",
    name: "Jane Vendor",
    email: "jan.vendor@test.com",
    company: "Vendorize",
    category: "vendor",
    status: "pending",
  },
  {
    id: "3",
    name: "Retail Queen",
    email: "retail.queen@test.com",
    company: "RetailMart",
    category: "retailer",
    status: "blocked",
  },
];

const CATEGORY_LABELS = {
  supplier: "Supplier",
  vendor: "Vendor",
  retailer: "Retailer",
  wholesaler: "Wholesaler",
  production: "Production",
  hr: "HR",
};

const PendingRequestsPanel: React.FC = () => {
  const [requests, setRequests] = useState<PendingRequest[]>(mockRequests);

  const handleRequestAction = (
    id: string,
    action: "approve" | "disapprove" | "block" | "unblock"
  ) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status:
                action === "approve"
                  ? "approved"
                  : action === "disapprove"
                  ? "disapproved"
                  : action === "block"
                  ? "blocked"
                  : "pending",
            }
          : req
      )
    );
  };

  // Group by category
  const grouped = requests.reduce<Record<string, PendingRequest[]>>((acc, req) => {
    if (!acc[req.category]) acc[req.category] = [];
    acc[req.category].push(req);
    return acc;
  }, {});

  return (
    <Card className="mb-8 animate-fade-in bg-white/70 backdrop-blur-md shadow-md rounded-xl border border-muted space-y-4">
      <CardHeader>
        <CardTitle className="text-lg">Pending User Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(grouped).map(([category, list]) => (
          <div key={category}>
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-blue-200 to-aktina-blue text-blue-900 px-3 py-1 text-base font-semibold shadow-sm">
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {list.filter((r) => r.status === "pending").length} pending
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((req) => (
                    <TableRow key={req.id} className="transition">
                      <TableCell>{req.name}</TableCell>
                      <TableCell>{req.email}</TableCell>
                      <TableCell>{req.company ?? "-"}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            req.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : req.status === "blocked"
                              ? "bg-red-100 text-red-700"
                              : req.status === "approved"
                              ? "bg-green-200 text-green-700"
                              : "bg-neutral-200 text-neutral-700"
                          }
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-1 flex-wrap">
                        {req.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="hover:scale-105" onClick={() => handleRequestAction(req.id, "approve")}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="hover:scale-105" onClick={() => handleRequestAction(req.id, "disapprove")}>
                              Disapprove
                            </Button>
                            <Button size="sm" variant="destructive" className="hover:scale-105" onClick={() => handleRequestAction(req.id, "block")}>
                              Block
                            </Button>
                          </>
                        )}
                        {req.status === "blocked" && (
                          <Button size="sm" variant="secondary" className="hover:scale-105" onClick={() => handleRequestAction(req.id, "unblock")}>
                            Unblock
                          </Button>
                        )}
                        {(req.status === "approved" || req.status === "disapproved") && (
                          <span className="text-green-500 font-semibold">Managed</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingRequestsPanel;
