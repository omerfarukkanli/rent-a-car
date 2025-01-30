import { Car } from '@/store/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CarInfo } from '../molecules/CarInfo';
import { CarActions } from '../molecules/CarActions';
import { useEnumConverter } from '@/hooks/enumConvert';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface CarsTableProps {
  cars: Car[];
}

export const CarsTable = ({ cars }: CarsTableProps) => {
  const { convertCarType } = useEnumConverter();

  const columns: ColumnDef<Car>[] = [
    {
      accessorKey: 'image',
      header: 'Araç',
      cell: ({ row }) => (
        <CarInfo
          image={row.original.image}
          brand={row.original.brand}
          model={row.original.carModel}
        />
      ),
    },
    {
      accessorKey: 'carType',
      header: 'Tip',
      cell: ({ row }) => convertCarType(row.original.carType),
    },
    {
      accessorKey: 'year',
      header: 'Model Yılı',
    },
    {
      id: 'actions',
      header: 'İşlemler',
      cell: ({ row }) => <CarActions car={row.original} />,
    },
  ];

  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='bg-white rounded-lg border shadow-sm'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
