import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Widget {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // @CreateDateColumn({ readonly: true })
  // createdAt: Date;
  //
  // @UpdateDateColumn({ readonly: true })
  // updatedAt: Date;

  @Column({ type: 'integer' })
  remoteId: number;
}
